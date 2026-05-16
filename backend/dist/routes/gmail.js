"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gmailController_1 = require("../controllers/gmailController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/emails', auth_1.authMiddleware, gmailController_1.getEmails);
router.patch('/emails/:messageId/read', auth_1.authMiddleware, gmailController_1.markAsRead);
exports.default = router;
