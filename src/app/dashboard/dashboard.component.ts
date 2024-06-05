import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import moment from 'moment';

import { environment } from '../../environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  searchQuery: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedCategory: string | undefined;
  searchResults: any[] = [];
  isSearchValid: boolean = false;
  errorMessage: string = '';
  accessToken: any;
  idToken: any;
  baseUrl = environment.baseUrl;
  isLoading = false;
  noRecordsFound = false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.selectedCategory = 'Search By Name and Date Range';
    this.accessToken = this.getToken('accessToken');
    this.idToken = this.getToken('idToken');
    this.tryRefreshToken;
  }
  async tryRefreshToken() {
    if (
      (!this.accessToken && this.checkRefreshToken()) ||
      this.checkIdToken()
    ) {
      try {
        const newAccessToken = await this.refreshToken();
        this.accessToken = newAccessToken;
      } catch (error) {
        console.error('Error refreshing token:', error);
        this.errorMessage = 'An error occurred while refreshing your token.';
      }
    }
  }

  checkIdToken() {
    return true;
    const bufferTime = 300; // 5 minutes in seconds
    if (moment().unix() + bufferTime >= this.parseJwt(this.idToken).exp) {
      return true;
    }
    return false;
  }
  // Method to check if search is valid
  checkSearchValidity() {
    this.isSearchValid =
      this.searchQuery.trim() !== '' &&
      this.fromDate.trim() !== '' &&
      this.toDate.trim() !== '';
  }
  async onSearch() {
    if (!this.isSearchValid) {
      this.errorMessage = 'Please fill in all search fields.';
      return; // Do nothing if search is not valid
    }
    this.isLoading = true;
    await this.tryRefreshToken();
    this.errorMessage = '';
    const apiUrlForRecords = `${this.baseUrl}/get-records`;
    let params = {
      agentName: this.searchQuery,
      startDate: this.fromDate,
      endDate: this.toDate,
    };

    const headers = new HttpHeaders({
      Authorization: this.accessToken ?? 0,
    });

    this.http.get<any>(apiUrlForRecords, { headers, params }).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.data.length == 0) {
          this.noRecordsFound = true;
        }
        this.noRecordsFound = false;
        this.searchResults = response.data;
      },
      (error: any) => {
        this.isLoading = false;
        if (error.status) {
          switch (error.status) {
            case 401:
              this.errorMessage =
                'Unauthorized access. Please refresh your token.';
              break;
            case 404:
              this.errorMessage = 'Data not found for your search criteria.';
              break;
            default:
              this.errorMessage = 'An error occurred while fetching results.';
          }
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
        console.error('Error fetching search results:', error);
      }
    );
  }

  // Method to clear search inputs
  clearSearch() {
    this.searchResults = [];
    this.searchQuery = '';
    this.fromDate = '';
    this.toDate = '';
    this.isSearchValid = false;
    this.errorMessage = '';
    this.isLoading = false;
  }

  async downloadAudio(audioFilePath: string | undefined, fileName: string) {
    await this.tryRefreshToken();
    if (!audioFilePath) {
      console.error('Audio file path is undefined.');
      this.errorMessage = 'Audio file unavailable.';
      return;
    }

    // Construct the full URL with the provided endpoint and audio file path parameter
    const apiUrl = `${this.baseUrl}/get-recording-link?objectPath=${audioFilePath}`;
    const headers = new HttpHeaders({
      Authorization: this.accessToken ?? 0,
    });

    try {
      const response = await this.http.get(apiUrl, { headers }).toPromise();
      const blob = await fetch((response as { url: string }).url).then((r) =>
        r.blob()
      );
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);

      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error downloading audio:', error);
      this.errorMessage = 'An error occurred while downloading the audio file.';
    }
  }

  parseJwt(token: string | undefined): any {
    if (!token) {
      return null; // No token provided
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error(
        'Invalid JWT token format. Expected 3 parts separated by "."'
      );
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload;
    try {
      jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (error) {
      console.error('Error decoding base64 payload:', error);
      return null;
    }

    try {
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Invalid JSON payload in JWT token:', error);
      return null;
    }
  }

  getToken(tokenName: string) {
    return document.cookie
      .split(/; */)
      .find((cookieraw) => {
        const name = cookieraw.split('=')[0];
        if (
          name.startsWith('CognitoIdentityServiceProvider.') &&
          name.endsWith(`.${tokenName}`)
        ) {
          return true;
        }
        return false;
      })
      ?.split('=')[1];
  }

  checkRefreshToken(): boolean {
    const refreshToken = this.getToken('refreshToken');
    return refreshToken !== undefined && refreshToken !== '';
  }

  async refreshToken(): Promise<string | undefined> {
    const refreshToken = this.getToken('refreshToken');
    this.idToken = this.getToken('idToken');
    if (!refreshToken) {
      this.errorMessage = 'No refresh token available.';
      return undefined; // No refresh token available
    }
    try {
      const response = await fetch(
        `https://<mydomain>.auth.ca-central-1.amazoncognito.com/oauth2/token`,
        {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/x-www-form-urlencoded',
          }),
          body: Object.entries({
            grant_type: 'refresh_token',
            client_id: 'place_your_client_id',
            redirect_uri: window.location.origin,
            refresh_token: refreshToken,
          })
            .map(([k, v]) => `${k}=${v}`)
            .join('&'),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Could not refresh token:', errorData);
        // Handle errors based on the error code from Cognito
        switch (errorData.error) {
          case 'InvalidRefreshToken':
            this.errorMessage = 'Invalid refresh token. Please sign in again.';
            break;
          case 'TokenExpired':
            this.errorMessage = 'Refresh token expired. Please sign in again.';
            break;
          default:
            this.errorMessage = 'An error occurred while refreshing token.';
        }
        return undefined;
      }

      const data = await response.json();
      console.log('Token refreshed successfully');
      this.accessToken = data.access_token;
      this.idToken = data.idToken;
      return this.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.errorMessage = 'An unexpected error occurred during refresh.';
      return undefined;
    }
  }
}
