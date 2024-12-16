import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  IgxButtonDirective,
  IgxTreeComponent,
  IgxTreeNodeComponent,
} from 'igniteui-angular';

export type Group = {
  id: string;
  elements: string[];
  children: Group[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IgxTreeComponent,
    IgxTreeNodeComponent,
    IgxButtonDirective,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  groups = signal<Group[]>([]);
  selectedElements = signal<string[]>(['a', 'b']);

  onLoadButtonPressed() {
    this.groups.set([
      {
        id: 'Group1',
        elements: ['a', 'c', 'e'],
        children: [
          { id: 'Group1a', elements: ['b', 'd', 'f'], children: [] },
          { id: 'Group1b', elements: ['g', 'h', 'i'], children: [] },
        ],
      },
    ]);
  }
}
