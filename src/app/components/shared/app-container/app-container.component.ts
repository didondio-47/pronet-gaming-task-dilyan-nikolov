import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
    selector: 'app-container',
    templateUrl: './app-container.component.html',
    styleUrls: ['./app-container.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, MatDrawerContainer, MatDrawerContent, MatDrawer],
})
export class PageContainerComponent {
    /**
    * Set to true to show a side drawer. Content is controlled via `drawerContent` property.
    */
    public readonly showDrawer = input<boolean>(false);

    /**
     * Additional content which should be rendered in a side drawer.
     * Use showDrawer to control the display.
     */
    public readonly drawerContent = input<TemplateRef<any> | null>(null);
}