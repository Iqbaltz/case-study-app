import ProductList from "@/components/ProductList";

// async function getProducts() {
//   const res = await fetch("https://fakestoreapi.com/products");
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ProductList />
    </main>
  );
}
