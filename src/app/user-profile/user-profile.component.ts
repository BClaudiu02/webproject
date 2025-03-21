import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service'; // Adjust path
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any | null = null; // Firebase user object (has displayName, email, etc.)
  editForm: FormGroup;
  isEditing = false;
  deleteConfirmationVisible = false;
  firebaseErrorMessage: string = '';  // For displaying Firebase errors

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      displayName: ['', Validators.required] // Only allow editing the display name
      // You can't directly edit the email through this method (Firebase restriction).
      // Password changes require a different flow (see notes below)
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getCurrentUser().then(user => {
      this.user = user;
      if (user) {
        this.editForm.patchValue({ displayName: user.displayName }); // Populate form
      } else {
        this.router.navigate(['/login']); // Redirect if not logged in
      }
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (this.user) {
        this.editForm.patchValue({ displayName: this.user.displayName }); // Reset
    }

  }

  saveChanges(): void {
    if (this.editForm.valid && this.user) {
      const newDisplayName = this.editForm.value.displayName;
      this.authService.updateUserProfile(newDisplayName).then(() => {
          this.isEditing = false;
          this.user.displayName = newDisplayName; // Update the displayed name
          this.firebaseErrorMessage = '';  // Clear any previous errors
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
      this.authService.logout(); // Log out after successful deletion
      this.router.navigate(['/']); // Redirect
    }).catch(error => {
      this.firebaseErrorMessage = error.message;
      console.error("Error deleting user account:", error);
    });
  }
}