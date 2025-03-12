import { BadRequestException } from '@nestjs/common';

export class Permission {
  static check(id: string, currentUser) {
    let { id: userId, role } = currentUser.user;
    if (id === userId) return;
    if (role === 'admin') return;
    throw new BadRequestException('USER can not perform action');
  }
}
