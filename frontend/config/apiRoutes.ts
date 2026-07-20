const apiRoutes = {
  task: {
    getAll: "/task",
    create: "/task",
    update: (id: string) => `/task/${id}`,
    delete: (id: string) => `/task/${id}`,
  },
};

export default apiRoutes;
