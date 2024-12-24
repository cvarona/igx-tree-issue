import { JsonPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from "@angular/core";
import {
  IgxButtonDirective,
  IgxDialogComponent,
  IgxTreeComponent,
  IgxTreeNodeComponent,
} from "igniteui-angular";
import { delay, of, tap } from "rxjs";

export type Group = {
  id: string;
  elements: string[];
  children: Group[];
};

const data = [
  {
    id: "Group1",
    elements: ["a", "c", "e"],
    children: [
      { id: "Group1a", elements: ["b", "d", "f"], children: [] },
      { id: "Group1b", elements: ["g", "h", "i"], children: [] },
    ],
  },
];
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    IgxDialogComponent,
    IgxTreeComponent,
    IgxTreeNodeComponent,
    IgxButtonDirective,
    JsonPipe,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  groups = signal<Group[]>([]);
  selectedElements = signal<string[]>([]);
  dialog = viewChild.required(IgxDialogComponent);

  onLoadButtonPressed() {
    of({})
      .pipe(
        delay(500),
        tap(() => this.groups.set(data))
      )
      .subscribe(() => {
        this.selectedElements.set(["a", "b"]);
        this.dialog().open();
      });
  }
}
