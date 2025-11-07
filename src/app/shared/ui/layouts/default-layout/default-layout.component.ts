import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GITHUB_URL } from '@currency-conversion/core/tokens';

@Component({
  selector: 'cc-default-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent {
  private githubUrlToken = inject(GITHUB_URL);

  get githubUrl(): string {
    return this.githubUrlToken;
  }
}
