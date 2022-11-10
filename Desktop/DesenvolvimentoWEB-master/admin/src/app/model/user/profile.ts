export class Profile {

    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    value: boolean;
    menu: Menu[];

    constructor() {
        this.menu = [];
    }
}

export class Menu {

    menuId: string;
    displayName: string;
    url: string;
    parentMenu: string;
    icon: string;
    create: boolean;
    update: boolean;
    read: boolean;
    delete: boolean;
    access: boolean;
    subMenu: Menu[];
    all: boolean;

    constructor() {
        this.subMenu = [];
    }
}
