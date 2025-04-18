import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from '../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any | null = null;
  userProfile: UserProfile | null = null; 
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
      displayName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(30), Validators.max(300)]],
      height: [null, [Validators.required, Validators.min(100), Validators.max(250)]]
    });    
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getCurrentUser().then(user => {
      this.user = user;
      if (user) {
         this.authService.getUserProfile(user.uid).then(profile => {
          this.userProfile = profile;
          console.log("User Profile Data:", this.userProfile);
          this.editForm.patchValue({
            displayName: user.displayName,
            gender: profile?.gender || '',  
            birthDate: profile?.birthDate, 
            weight: profile?.weight,
            height: profile?.height
          });
         });

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
    if (this.userProfile) {  
      this.editForm.patchValue({ 
         displayName: this.user.displayName,
         gender: this.userProfile.gender || '',
         birthDate: this.userProfile.birthDate,
         weight: this.userProfile.weight,
         height: this.userProfile.height
       });
    }

  }

  saveChanges(): void {
    if (this.editForm.valid && this.user) {
      const formData = this.editForm.value;
  
      this.authService.updateUserProfile(formData.displayName)
        .then(() => {
          return this.authService.updateUserProfileData(this.user.uid, {
            gender: formData.gender,
            birthDate: formData.birthDate,
            weight: formData.weight,
            height: formData.height
          });
        })
        .then(() => {
          this.loadUserProfile();
          this.isEditing = false;
          this.firebaseErrorMessage = '';
        })
        .catch(error => {
          this.firebaseErrorMessage = error.message;
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