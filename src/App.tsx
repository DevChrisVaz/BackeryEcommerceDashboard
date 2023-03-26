import { lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/styles/index.scss';
import './styles.scss';
import popover from './assets/scripts/popover';
import { Home } from './pages/Home';
import { Messenger } from './pages/Messenger';
import { Email } from './pages/Email';
import { Inbox } from './pages/Email/Inbox';
import { Send } from './pages/Email/Send';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Categories } from './pages/Categories';
import { CategoriesList } from './pages/Categories/CategoriesList'; 
import { NotFound } from './pages/NotFound';
import { Error } from './pages/Error';
import { Products } from './pages/Products';
import { ProductsList } from './pages/Products/ProductsList';
import { CreateCategory } from './pages/Categories/CreateCategory';
// import { ProtectedRoutes } from './components/Security/ProtectedRoutes';
import { ProductDetails } from './pages/Products/ProductDetails';
import { CreateProduct } from './pages/Products/CreateProduct';
import { Ingredients } from './pages/Ingredients';
import { IngredientsList } from './pages/Ingredients/IngredientsList';
import { CreateIngredient } from './pages/Ingredients/CreateIngredient';
import { Users } from './pages/Users';
import { UsersList } from './pages/Users/UsersList';
import { CreateUser } from './pages/Users/CreateUser';

function App() {

  // const CategoriesList = lazy(() => import("./pages/Categories/CategoriesList").then(({ CategoriesList }) => ({ default: CategoriesList })));

  useEffect(() => {
    popover();
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<ProtectedRoutes isAllowed={!!condition} redirectTo="/" />}>
            <Route />
            <Route />
          </Route> */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="email" element={<Email />}>
              <Route index element={<Inbox />} />
              <Route path="send" element={<Send />}/>
            </Route>
            <Route path="categories" element={<Categories />}>
              <Route index element={<CategoriesList />} />
              <Route path="new" element={<CreateCategory />} />
            </Route>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="new" element={<CreateProduct />} />
              <Route path=':id' element={<ProductDetails />} />
            </Route>
            <Route path="ingredients" element={<Ingredients />}>
              <Route index element={<IngredientsList />} />
              <Route path="new" element={<CreateIngredient />} />
              {/* <Route path=':id' element={<ProductDetails />} /> */}
            </Route>
            <Route path="users" element={<Users />}>
              <Route index element={<UsersList />} />
              <Route path="new" element={<CreateUser />} />
              {/* <Route path=':id' element={<ProductDetails />} /> */}
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
