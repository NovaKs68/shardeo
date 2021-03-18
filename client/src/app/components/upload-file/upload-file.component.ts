import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  @Output() uploadNewFile = new EventEmitter<File | null>();
  file: File | null = null;
  progress: number = 0;

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFileList($event[0]);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(e: Event) {
    const file = (<HTMLInputElement>e.target).files![0];
    this.prepareFileList(file);
  }

  /**
   * Delete file from file list
   */
  deleteFile() {
    this.file = null;
    (<HTMLInputElement>document.getElementById('fileDropRef')!).value = '';
    this.uploadNewFile.emit(this.file);
  }

  /**
   * Simulate the upload process
   */
  uploadFileSimulator() {
    setTimeout(() => {
        const progressInterval = setInterval(() => {

          if (this.file === null) {
            clearInterval(progressInterval);
          } else if (this.progress === 100) {
            this.uploadNewFile.emit(this.file);
            clearInterval(progressInterval);
          } else {
            this.progress += 5;
          }

        }, 200);
    }, 1000);
  }

  /**
   * Convert File list to normal array list
   * @param file (File List)
   */
  prepareFileList(file: File | null) {
    this.file = file;
    this.progress = 0;
    this.uploadFileSimulator();
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   */
  formatBytes(bytes: any) {
    const decimals: number = bytes - Math.floor(bytes)
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
