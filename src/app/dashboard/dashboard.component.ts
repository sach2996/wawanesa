import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  errorMessge: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
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
      this.errorMessge = 'Please fill in all search fields.';
      return; // Do nothing if search is not valid
    }
    this.errorMessge = '';
    const apiUrlForRecords = 'abc.com/dev/get-records';
    let params = {
      agentName: this.searchQuery,
      startDate: this.fromDate,
      endDate: this.toDate,
      Authorization:
        'eyJraWQiOiJUYlRCS2MzUTVlaU9VSDdTS2k5RHVXXC9tckVVUjRDMVplc2ZLY0NUZ09SND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmY2FkMDU0OC1jMDYxLTcwMDUtZjFlMy0yMzZhMTQ3MzUzYTUiLCJjb2duaXRvOmdyb3VwcyI6WyJjYS1jZW50cmFsLTFfbVdHc1BOOGdpX2F6dXJlIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5jYS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvY2EtY2VudHJhbC0xX21XR3NQTjhnaSIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjQzdWw5OG41djlhNm9pdGE3ZjQ3aGk5a3JnIiwib3JpZ2luX2p0aSI6IjU2YTgyZmQ5LTUwZDctNDA0Yy04YzFjLWJjZmQ1ZDA3NDhmZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInN',
    };

    // params .set('Authorization', 'eyJraWQiOiJUYlRCS2MzUTVlaU9VSDdTS2k5RHVXXC9tckVVUjRDMVplc2ZLY0NUZ09SND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmY2FkMDU0OC1jMDYxLTcwMDUtZjFlMy0yMzZhMTQ3MzUzYTUiLCJjb2duaXRvOmdyb3VwcyI6WyJjYS1jZW50cmFsLTFfbVdHc1BOOGdpX2F6dXJlIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5jYS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvY2EtY2VudHJhbC0xX21XR3NQTjhnaSIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjQzdWw5OG41djlhNm9pdGE3ZjQ3aGk5a3JnIiwib3JpZ2luX2p0aSI6IjU2YTgyZmQ5LTUwZDctNDA0Yy04YzFjLWJjZmQ1ZDA3NDhmZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInN');

    this.http.get<any>(apiUrlForRecords, { params }).subscribe(
      (response) => {
        response = {
          data: [
            {
              recording_id: 1,
              agent_time: 'John Doe',
              start_time: '2021-09-03T12:00:00:208-05:00',
              end_time: '2021-09-03T12:05:00:208-05:00',
              accoutn_number: '',
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
              agent_time: 'John Doe',
              start_time: '2021-09-03T12:00:00:208-05:00',
              end_time: '2021-09-03T12:05:00:208-05:00',
              accoutn_number: '',
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
              agent_time: 'John Doe',
              start_time: '2021-09-03T12:00:00:208-05:00',
              end_time: '2021-09-03T12:05:00:208-05:00',
              accoutn_number: '',
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
              agent_time: 'John Doe',
              start_time: '2021-09-03T12:00:00:208-05:00',
              end_time: '2021-09-03T12:05:00:208-05:00',
              accoutn_number: '',
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
          ],
        };
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
    this.errorMessge = '';
  }

  downloadAudio(audioFilePath: string | undefined) {
    if (!audioFilePath) {
      console.error('Audio file path is undefined.');
      return;
    }

    // Construct the full URL with the provided endpoint and audio file path parameter
    // const apiUrl = `https://0h7pvgmu86.execute-api.ca-central-1.amazonaws.com/dev/get-recording-link?objectPath=${audioFilePath}`;
    const apiUrl =
      'test.com/dev/get-recording-link?objectPath=${audioFilePath}';

    // Make a GET request to the constructed URL to download the audio file
    this.http.get(apiUrl).subscribe((response: any) => {
      fetch(response.url)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          // Create a temporary link element
          const a = document.createElement('a');
          a.href = url;
          a.download = 'audio.wav';
          a.style.display = 'none';
          // Append the link element to the document body
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
}
