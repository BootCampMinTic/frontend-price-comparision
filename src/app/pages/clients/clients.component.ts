import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client, CreateNaturalClient, CreateLegalClient } from '../../models';

@Component({
  selector: 'app-clients',
  imports: [FormsModule],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  private readonly service = inject(ClientService);
  readonly naturalClients = signal<Client[]>([]);
  readonly legalClients = signal<Client[]>([]);
  readonly loading = signal(true);
  readonly showForm = signal(false);
  readonly activeTab = signal<'natural'|'legal'>('natural');
  newNatural: CreateNaturalClient = { name:'',lastName:'',documentNumber:'',electronicInvoiceEmail:'',documentTypeId:1 };
  newLegal: CreateLegalClient = { companyName:'',documentNumber:'',documentTypeId:3 };

  ngOnInit() { this.loadAll(); }
  loadAll() { this.loading.set(true); this.service.getAllNatural().subscribe(r=>this.naturalClients.set(r.data)); this.service.getAllLegal().subscribe(r=>{this.legalClients.set(r.data);this.loading.set(false);}); }
  createNatural() { this.service.createNatural(this.newNatural).subscribe({next:()=>{this.newNatural={name:'',lastName:'',documentNumber:'',electronicInvoiceEmail:'',documentTypeId:1};this.showForm.set(false);this.loadAll();}}); }
  createLegal() { this.service.createLegal(this.newLegal).subscribe({next:()=>{this.newLegal={companyName:'',documentNumber:'',documentTypeId:3};this.showForm.set(false);this.loadAll();}}); }
}
