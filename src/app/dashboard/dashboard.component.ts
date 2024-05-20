import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
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

  constructor(private authService: AuthService, private http: HttpClient) {}
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.redirectToAuth();
    }
    this.selectedCategory = 'Search By Name and Date Range';
  }

  // Method to check if search is valid
  checkSearchValidity() {
    this.isSearchValid =
      this.searchQuery.trim() !== '' &&
      this.fromDate.trim() !== '' &&
      this.toDate.trim() !== '';
  }
  onSearch() {
    if (!this.isSearchValid) {
      this.errorMessage = 'Please fill in all search fields.';
      return; // Do nothing if search is not valid
    }
    this.errorMessage = '';
    const apiUrlForRecords = 'abc.com/dev/get-records';
    let params = {
      agentName: this.searchQuery,
      startDate: this.fromDate,
      endDate: this.toDate,
    };

    const headers = new HttpHeaders({
      Authorization: `${this.authService.getToken()!}`,
    });

    this.http.get<any>(apiUrlForRecords, { headers, params }).subscribe(
      (response) => {
        this.searchResults = response.data;
      },
      (error: any) => {
        console.error('Error fetching search results:', error);
      }
    );

    // comment below line as this is mock data
    this.searchResults = [
      {
        recording_id: 1,
        agent_name: 'John Doe',
        start_time: '2021-09-03T12:00:00:208-05:00',
        end_time: '2021-09-03T12:05:00:208-05:00',
        account_number: '',
        call_direction: 'Outbound',
        ani: '123345',
        dnis: '12345',
        contact_duration: '1422',
        policy_number: 12344,
        account_name: '',
        policy_type: '',
        audio: '122325452.wav',
        audio_file_path: 'archive/asda/asdas.wav',
        recording_date: '2021-09-03T12:05:00:208-05:00',
      },
      {
        recording_id: 2,
        agent_name: 'John Doe',
        start_time: '2021-09-03T12:00:00:208-05:00',
        end_time: '2021-09-03T12:05:00:208-05:00',
        account_number: '',
        call_direction: 'Outbound',
        ani: '123345',
        dnis: '12345',
        contact_duration: '1422',
        policy_number: 12344,
        account_name: '',
        policy_type: '',
        audio: '122325452.wav',
        audio_file_path: 'archive/asda/asdas.wav',
        recording_date: '2021-09-03T12:05:00:208-05:00',
      },
      {
        recording_id: 3,
        agent_name: 'John Doe',
        start_time: '2021-09-03T12:00:00:208-05:00',
        end_time: '2021-09-03T12:05:00:208-05:00',
        account_number: '',
        call_direction: 'Outbound',
        ani: '123345',
        dnis: '12345',
        contact_duration: '1422',
        policy_number: 12344,
        account_name: '',
        policy_type: '',
        audio: '122325452.wav',
        audio_file_path: 'archive/asda/asdas.wav',
        recording_date: '2021-09-03T12:05:00:208-05:00',
      },
      {
        recording_id: 4,
        agent_name: 'John Doe',
        start_time: '2021-09-03T12:00:00:208-05:00',
        end_time: '2021-09-03T12:05:00:208-05:00',
        account_number: '',
        call_direction: 'Outbound',
        ani: '123345',
        dnis: '12345',
        contact_duration: '1422',
        policy_number: 12344,
        account_name: '',
        policy_type: '',
        audio: '122325452.wav',
        audio_file_path: 'archive/asda/asdas.wav',
        recording_date: '2021-09-03T12:05:00:208-05:00',
      },
    ];
  }

  // Method to clear search inputs
  clearSearch() {
    this.searchResults = [];
    this.searchQuery = '';
    this.fromDate = '';
    this.toDate = '';
    this.isSearchValid = false;
    this.errorMessage = '';
  }

  downloadAudio(audioFilePath: string | undefined, fileName: string) {
    if (!audioFilePath) {
      console.error('Audio file path is undefined.');
      return;
    }

    const apiUrl =
      'test.com/dev/get-recording-link?objectPath=${audioFilePath}';

    const headers = new HttpHeaders({
      Authorization: `${this.authService.getToken()!}`,
    });
    // Make a GET request to the constructed URL to download the audio file
    this.http.get(apiUrl, { headers }).subscribe((response: any) => {
      fetch(response.url)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          // Create a temporary link element
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.style.display = 'none';
          document.body.appendChild(a);

          // Trigger the click event programmatically
          a.click();

          // Clean up: remove the link element and revoke the URL
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error downloading audio:', error);
        });
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
