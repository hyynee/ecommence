"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const common_1 = require("@nestjs/common");
class Permission {
    static check(id, currentUser) {
        let { id: userId, role } = currentUser.user;
        if (id === userId)
            return;
        if (role === 'admin')
            return;
        throw new common_1.BadRequestException('USER can not perform action');
    }
}
exports.Permission = Permission;
//# sourceMappingURL=checkPermison.js.map