import TaskPage from "./TaskPage";

const Layout = () => {


  return (
    <main className="min-h-screen bg-gray-100">

        <header className="bg-indigo-700 h-60 p-8">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        </header>

        <section className="relative mx-auto -mt-24 bg-white rounded-t-[40px] p-8 shadow-2xl min-h-[calc(100vh-150px)]">
          <TaskPage />
        </section>

    </main>
  );
};

export default Layout;
