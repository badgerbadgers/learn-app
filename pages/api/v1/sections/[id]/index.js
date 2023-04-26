/**
 * @swagger
 * tags:
 *   name: Sections
 * /api/v1/sections/{id}:
 *   patch:
 *     description: Updates a Section in database using the id
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 63fd39c51e0a85c4749274ff
 *         description: id of the section to update
 *       - in: body
 *         name: data
 *         schema:
 *           type: object
 *           properties:
 *             order:
 *               type: number
 *             course:
 *               type: string
 *             title:
 *               type: string
 *         description: the updated static page object when PATCH request is called
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: number
 *                       example: 2
 *                     course:
 *                       type: string
 *                       example: 633d9916ec0d4b5e83a6b062
 *                     title:
 *                       type: string
 *                       example: Git Basics
 *       400:
 *         description: Error messages
 *
 */
