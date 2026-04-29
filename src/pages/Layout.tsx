import Header from "../features/tasks/components/Header";
import TaskPage from "./TaskPage";

const Layout = () => {


  return (
    <main className="min-h-screen bg-gray-100">

        <Header />

        <section className="relative mx-auto -mt-24 bg-white rounded-t-[40px] p-8 shadow-2xl min-h-[calc(100vh-150px)]">
          <TaskPage />
        </section>

    </main>
  );
};

export default Layout;
