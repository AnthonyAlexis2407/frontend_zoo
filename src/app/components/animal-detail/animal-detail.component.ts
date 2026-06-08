import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './animal-detail.component.html',
})
export class AnimalDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly animalService = inject(AnimalService);

  readonly animal = signal<Animal | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.animalService.getById(id).subscribe({
      next: (data) => {
        this.animal.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }
}
