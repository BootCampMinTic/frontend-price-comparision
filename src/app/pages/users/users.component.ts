import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { User, CreateUser } from '../../models';

@Component({
  selector: 'app-users',
  imports: [FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private readonly service = inject(UserService);
  readonly users = signal<User[]>([]);
  readonly loading = signal(true);
  readonly showForm = signal(false);
  displayedColumns = ['id', 'name', 'type'];
  newUser: CreateUser = { name: '', password: '', typeUserId: 2 };

  ngOnInit() { this.loadUsers(); }
  loadUsers() {
    this.loading.set(true);
    this.service.getAll().subscribe({ next: (r) => { this.users.set(r); this.loading.set(false); }, error: () => this.loading.set(false) });
  }
  create() {
    this.service.create(this.newUser).subscribe({
      next: () => { this.newUser = { name: '', password: '', typeUserId: 2 }; this.showForm.set(false); this.loadUsers(); },
    });
  }
}
