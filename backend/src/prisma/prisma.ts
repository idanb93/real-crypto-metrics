// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
// async function main(): Promise<void> {
//   const projects = await prisma.project.findMany()
//   console.log(projects)

// CREATE
//   const user = await prisma.user.create({
//     data: {
//       name: 'Amit',
//       email: 'amit@company.com'
//     }
//   })
//   console.log(user)
// UPDATE
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: 4
//     },
//     data: {
//       name: 'Amit Asher'
//     }
//   })
//   console.log(updatedUser)
// DELETE
//   const deletedUser = await prisma.user.delete({
//     where: {
//       id: 4
//     }
//   })
//   console.log(deletedUser)
// READ
//   const user = await prisma.user.findFirst({
//     where: {
//       id: 4
//     }
//   })
//   console.log(user)
//   const users = await prisma.user.findMany()
//   console.log(users)
//   const usersWithPosts = await prisma.user.findMany({
//     include: {
//       posts: true
//     }
//   })
//   console.dir(usersWithPosts, { depth: null })
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
