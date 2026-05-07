import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { UserService } from '../../services/user.service';
import { TypeUserService } from '../../services/type-user.service';
import { NotificationService } from '../../core/notification.service';
import { PageHeader } from '../../shared/page-header.component';
import { EmptyState } from '../../shared/empty-state.component';
import { User, CreateUser, TypeUser } from '../../models';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule, TableModule, ButtonModule, DialogModule, CardModule,
    ProgressSpinnerModule, TagModule, InputTextModule, SelectModule, PageHeader, EmptyState,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly typeUserService = inject(TypeUserService);
  private readonly notification = inject(NotificationService);
  private readonly confirm = inject(ConfirmationService);

  protected readonly users = signal<User[]>([]);
  protected readonly typeUsers = signal<TypeUser[]>([]);
  protected readonly loading = signal(true);
  protected readonly dialogVisible = signal(false);
  protected readonly isEditing = signal(false);
  protected readonly currentId = signal<number | null>(null);

  protected form: CreateUser = { name: '', password: '', typeUserId: 1 };
  protected typeOptions: { label: string; value: number }[] = [];

  ngOnInit(): void {
    this.typeUserService.getAll().subscribe((r) => {
      this.typeUsers.set(r);
      this.typeOptions = r.map((t) => ({ label: t.description, value: t.id }));
    });
    this.loadUsers();
  }

  protected loadUsers(): void {
    this.loading.set(true);
    this.userService.getAll().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (r) => this.users.set(r),
      error: () => this.notification.error('Error al cargar usuarios'),
    });
  }

  protected openCreate(): void {
    this.isEditing.set(false);
    this.currentId.set(null);
    this.form = { name: '', password: '', typeUserId: 1 };
    this.dialogVisible.set(true);
  }

  protected openEdit(user: User): void {
    this.isEditing.set(true);
    this.currentId.set(user.id);
    this.form = { name: user.name, password: '', typeUserId: user.typeUserId };
    this.dialogVisible.set(true);
  }

  protected save(): void {
    if (this.isEditing() && this.currentId()) {
      const data: Partial<CreateUser> = { ...this.form };
      if (!data.password) delete data.password;
      this.userService.update(this.currentId()!, data).subscribe({
        next: () => { this.notification.success('Usuario actualizado'); this.dialogVisible.set(false); this.loadUsers(); },
        error: () => this.notification.error('Error al actualizar usuario'),
      });
    } else {
      this.userService.create(this.form).subscribe({
        next: () => { this.notification.success('Usuario creado'); this.dialogVisible.set(false); this.loadUsers(); },
        error: () => this.notification.error('Error al crear usuario'),
      });
    }
  }

  protected confirmDelete(user: User): void {
    this.confirm.confirm({
      message: `Eliminar al usuario "${user.name}"?`,
      header: 'Confirmar eliminacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      accept: () => {
        this.userService.delete(user.id).subscribe({
          next: () => { this.notification.success('Usuario eliminado'); this.loadUsers(); },
          error: () => this.notification.error('Error al eliminar usuario'),
        });
      },
    });
  }

  protected getTypeName(id: number): string {
    return this.typeUsers().find((t) => t.id === id)?.description ?? '-';
  }
}
