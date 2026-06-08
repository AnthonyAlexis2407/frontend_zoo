import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-list',
  imports: [RouterLink],
  templateUrl: './animal-list.component.html',
})
export class AnimalListComponent implements OnInit {
  private readonly animalService = inject(AnimalService);

  readonly animales = signal<Animal[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit(): void {
    this.loadAnimales();
  }

  loadAnimales(): void {
    this.loading.set(true);
    this.error.set(false);
    this.animalService.getAll().subscribe({
      next: (data) => {
        this.animales.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  deleteAnimal(id: string): void {
    if (!confirm('¿Estás seguro de eliminar este animal?')) return;
    this.animalService.delete(id).subscribe({
      next: () => this.loadAnimales(),
    });
  }
}
