import { Routes, Route } from "react-router-dom";


import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


import Error404Page from "../../pages/Error404Page";
import HomePage from "../../pages/HomePage"; 
import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
import PostDetailsPage from "../../pages/PostDetailsPage";
import GroupDetailsPage from "../../pages/GroupDetailsPage";
import ProfilePage from "../../pages/ProfilePage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import AllUsersPage from "../../pages/AllUsersPage";
import UserDetailsPage from "../../pages/UserDetailsPage";


export default function Main() {
  return (
    <div className='Main'>
      <Header/>
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/search/:search" element={<SearchResultsPage/>} />
          <Route path="/signin" element={ <SignInPage/> } />
          <Route path="/signup" element={ <SignUpPage/> } />
          <Route path="/profile" element={ <ProfilePage/> } />
          <Route path="/users" element={ <AllUsersPage/> } />
          <Route path="/posts/:postId" element={ <PostDetailsPage/> } />
          <Route path="/users/:userId" element={ <UserDetailsPage/> } />
          <Route path="/groups/:groupId" element={ <GroupDetailsPage/> } />
          <Route path="*" element={<Error404Page />} />
      </Routes>
      
      <Footer/>
    </div>
  )
}

