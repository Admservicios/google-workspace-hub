"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geminiController_1 = require("../controllers/geminiController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/chat', auth_1.authMiddleware, geminiController_1.chatWithGemini);
exports.default = router;
