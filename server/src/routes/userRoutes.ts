import { Router, Request, Response } from "express";

const router = Router();

router.post("/login");
router.post("/signup");
router.post("/forgotPassword");
router.patch("/resetPassword/:token");
router.patch("/updatePassword");

router.get("me");
router.patch("/updateMe");
router.delete("/deleteMe");

router.get("/allUsers");

router.route("/:id").get().patch().delete();

export { router };
