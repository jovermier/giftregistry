export class Gift {
  id: number;
  name: string;
  description: string;
}

export class Giftlist {
  id: number;
  name: string;
  gifts: Gift[];
}

export class User {
  id: number;
  name: string;
  giftlists: Giftlist[];
}
