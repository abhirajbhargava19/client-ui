import {Button} from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image'
import ProductCard from './components/ProductCard';

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};


const products: Product[] = [
  {
    id: '1',
    name: 'Margarita Pizza',
    description: 'This is a very tasty pizza',
    image: '/pizza-main.png',
    price: 500,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'A classic favorite with spicy pepperoni',
    image: '/cheese.png',
    price: 600,
  },
  {
    id: '3',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and cheese',
    image: '/chicken.png',
    price: 700,
  },
  {
    id: '4',
    name: 'Veggie Pizza',
    description: 'Loaded with fresh vegetables and cheese',
    image: '/jelapeno.png',
    price: 550,
  },
   {
    id: '',
    name: 'Veggie Pizza',
    description: 'Loaded with fresh vegetables and cheese',
    image: '/mushroom.png',
    price: 550,
  },
];

export default function Home() {
  return (
    <>
       <section className='bg-white'>
        <div className='container  mx-auto flex items-center justify-between py-24'>
          {/* LEFT SIDE */}
          <div>
            <h1 className='text-7xl font-black font-sans leading-tight'>
              Super Delicious Pizza in <br/>
              <span className='text-primary'>Only 45 Minutes</span>
            </h1>

            <p className='text-2xl mt-8 max-w-lg leading-snug'>
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
             
             {/* Right Side */}
            <Button className='mt-8 text-lg rounded-full py-7 px-6 font-bold'>
              Get your pizza now
            </Button>
          </div>
          <div>
              <Image alt="pizza-main" src={'/pizza-main.png'} width={400} height={400} />
          </div>
        </div>
        </section>
        <section>
          <div className='container py-12'>
            <Tabs defaultValue="pizza">
                <TabsList>
                   <TabsTrigger value="pizza" className="text-md">Pizza</TabsTrigger>
                   <TabsTrigger value="beverages" className="text-md">Beverages</TabsTrigger>
                </TabsList>
                <TabsContent value="pizza">
                  <div  className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                  {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                  </div>
                </TabsContent>
                <TabsContent value="beverages">Beverages list</TabsContent>
                <div  className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                  {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                  </div>
            </Tabs>
          </div>
        </section>
    </>
  );
}
