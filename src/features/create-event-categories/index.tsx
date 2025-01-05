// "use client";

// import Navbar from "@/components/Navbar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import useCreateEventCategories from "@/hooks/api/event-categories/useCreateEventCategory";
// import { useFormik } from "formik";

// const CreateEventCategoriesPage = () => {
//   const { mutateAsync: createEventCategories, isPending } =
//     useCreateEventCategories();
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//     },
//     onSubmit: async (values) => {
//       await createEventCategories(values);
//     },
//   });

//   return (
//     <>
//       <section className="container mx-auto pt-2">
//         <Navbar />
//       </section>
//       <section className="container mx-auto max-w-4xl py-4">
//         <h1 className="mb-4 text-4xl font-bold">Create Event Categories</h1>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-4 grid grid-cols-1 gap-4">
//             <div>
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={formik.values.title}
//                 onChange={formik.handleChange}
//               />
//             </div>
//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 name="description"
//                 placeholder="Description"
//                 value={formik.values.description}
//                 onChange={formik.handleChange}
//               />
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <Button type="submit" className="my-10" disabled={isPending}>
//               {isPending ? "Creating..." : "Create Event Categories"}
//             </Button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default CreateEventCategoriesPage;
