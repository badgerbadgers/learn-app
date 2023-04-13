/**
 * @swagger
 * tags:
 *   name: Sections
 * /api/v1/sections:
 *   get:
 *     description: Gets all sections from database
 *     tags: [Sections]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 75ge23c42f9b73c474826693
 *                       wordpress_id:
 *                         type: number
 *                         example: 4232
 *                       isShown:
 *                         type: boolean
 *                         example: false
 *                       slug:
 *                         type: string
 *                         example: giraffe-intro
 *                       title:
 *                         type: string
 *                         example: Giraffe Intro
 *
 */

import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {}
