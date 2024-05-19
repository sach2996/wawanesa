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
    const apiUrlForRecords = 'https://your-api-url/get-records';
    const params = {
      agentName: this.searchQuery,
      startDate: this.fromDate,
      endDate: this.toDate,
    };

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

    //comment below line as this is mock data
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
    const apiUrl = `https://testurl.com/dev/get-recording-link?objectPath=${audioFilePath}`;

    // Make a GET request to the constructed URL to download the audio file
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a blob object from the response data
        const blob = new Blob([response], { type: 'audio/wav' });

        // Create a temporary URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audio.wav'; // Set the default file name as 'audio.wav'
        document.body.appendChild(a);

        // Click the link to trigger the download
        a.click();

        // Clean up: remove the temporary link and revoke the URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading audio:', error);
      }
    );
  }
}
