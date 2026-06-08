import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './animal-form.component.html',
})
export class AnimalFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly animalService = inject(AnimalService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private editId: string | null = null;
  isEdit = false;
  submitting = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    especie: ['', Validators.required],
    habitat: ['', Validators.required],
    edad: [<number | null>null, [Validators.min(0), Validators.max(200)]],
    peso: [<number | null>null, [Validators.min(0)]],
    estadoSalud: ['Sano'],
    fechaIngreso: [''],
  });

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.isEdit = true;
      this.animalService.getById(this.editId).subscribe({
        next: (animal) => this.form.patchValue(animal),
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const data = this.form.value as Record<string, unknown>;
    const clean = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== null)
    );

    const obs = this.isEdit && this.editId
      ? this.animalService.update(this.editId, clean)
      : this.animalService.create(clean as any);

    obs.subscribe({
      next: () => {
        this.router.navigate(['/animales']);
      },
    });
  }
}
