import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DerivedDocument {
  exp: string;
  doc: string;
  fecha: string;
  prioridad: 'URGENTE' | 'MEDIA' | 'BAJA';
  emisor: string;
  paciente: string;
  avatar: string;
}

export interface ReturnedDocument {
  expediente: string;
  documento: string;
  paciente: string;
  date: string;
  time: string;
  emisor: string;
  emisorInitials: string;
  status: string;
  avatarClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentSharedService {
  private STORAGE_KEY = 'hospital_derived_docs';
  private RETURN_STORAGE_KEY = 'hospital_returned_docs';
  private CHANNEL_NAME = 'hospital_sync_channel';
  private channel = new BroadcastChannel(this.CHANNEL_NAME);
  
  private _derivedDocs: DerivedDocument[] = [];
  private _returnedDocs: ReturnedDocument[] = [];
  
  private _docsSubject = new BehaviorSubject<DerivedDocument[]>([]);
  private _returnedSubject = new BehaviorSubject<ReturnedDocument[]>([]);

  /** Observable for Admin → Fedatario */
  documents$ = this._docsSubject.asObservable();
  
  /** Observable for Fedatario → Admin */
  returnedDocuments$ = this._returnedSubject.asObservable();

  constructor(private zone: NgZone) {
    this.loadFromStorage();
    this._docsSubject.next([...this._derivedDocs]);
    this._returnedSubject.next([...this._returnedDocs]);
    
    this.channel.onmessage = (event) => {
      if (event.data) {
        this.zone.run(() => {
          if (event.data.type === 'SYNC_DOCS') {
            this._derivedDocs = event.data.docs;
            this._docsSubject.next([...this._derivedDocs]);
          } else if (event.data.type === 'SYNC_RETURNED') {
            this._returnedDocs = event.data.docs;
            this._returnedSubject.next([...this._returnedDocs]);
          }
        });
      }
    };

    window.addEventListener('storage', (event) => {
      if (event.key === this.STORAGE_KEY || event.key === this.RETURN_STORAGE_KEY) {
        this.zone.run(() => {
          this.loadFromStorage();
          this._docsSubject.next([...this._derivedDocs]);
          this._returnedSubject.next([...this._returnedDocs]);
        });
      }
    });
  }

  addDerivedDocument(doc: DerivedDocument): void {
    this._derivedDocs.unshift(doc);
    this.saveToStorage();
    this._docsSubject.next([...this._derivedDocs]);
    this.channel.postMessage({ type: 'SYNC_DOCS', docs: this._derivedDocs });
  }

  /** Add a document returned from Fedatario → Admin */
  addReturnedDocument(doc: ReturnedDocument): void {
    this._returnedDocs.unshift(doc);
    this.saveToStorage();
    this._returnedSubject.next([...this._returnedDocs]);
    this.channel.postMessage({ type: 'SYNC_RETURNED', docs: this._returnedDocs });
  }

  getDerivedDocuments(): DerivedDocument[] {
    return [...this._derivedDocs];
  }

  getReturnedDocuments(): ReturnedDocument[] {
    return [...this._returnedDocs];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._derivedDocs));
    localStorage.setItem(this.RETURN_STORAGE_KEY, JSON.stringify(this._returnedDocs));
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try { this._derivedDocs = JSON.parse(data); } catch (e) { this._derivedDocs = []; }
    }
    const returnData = localStorage.getItem(this.RETURN_STORAGE_KEY);
    if (returnData) {
      try { this._returnedDocs = JSON.parse(returnData); } catch (e) { this._returnedDocs = []; }
    }
  }
}
