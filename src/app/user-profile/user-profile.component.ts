import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any | null = null; 
  editForm: FormGroup;
  isEditing = false;
  deleteConfirmationVisible = false;
  firebaseErrorMessage: string = ''; 

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      displayName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getCurrentUser().then(user => {
      this.user = user;
      if (user) {
        this.editForm.patchValue({ displayName: user.displayName });
      } else {
        this.router.navigate(['/login']); 
      }
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (this.user) {
        this.editForm.patchValue({ displayName: this.user.displayName }); 
    }

  }

  saveChanges(): void {
    if (this.editForm.valid && this.user) {
      const newDisplayName = this.editForm.value.displayName;
      this.authService.updateUserProfile(newDisplayName).then(() => {
          this.isEditing = false;
          this.user.displayName = newDisplayName; 
          this.firebaseErrorMessage = '';  
      }).catch(error => {
          this.firebaseErrorMessage = error.message;
          console.error("Error updating user profile:", error);
      });
    }
  }

  showDeleteConfirmation(): void {
    this.deleteConfirmationVisible = true;
  }

  cancelDelete(): void {
    this.deleteConfirmationVisible = false;
  }

  confirmDelete(): void {
    this.authService.deleteUserAccount().then(() => {
      this.authService.logout(); 
      this.router.navigate(['/']); 
    }).catch(error => {
      this.firebaseErrorMessage = error.message;
      console.error("Error deleting user account:", error);
    });
  }
}