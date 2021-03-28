{
  type PageInfo = {
    title: string;
  };
  type Page = 'home' | 'about' | 'contact';

  // ✨ Record<K, V>: 첫번째 타입은 object의 key로, 두번째 타입은 value로 묶어준다.
  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  };

  // etc...
  type Product = 'cat' | 'dog';
  type NewProduct = Capitalize<Product>; // "Cat" | "Dog"
}
