import { Body, Controller, Post } from '@nestjs/common';
import { SubscriberDTO } from './dto/create-subs.dto';
import { SubscriberService } from './subscriber.service';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  createSubs(@Body() subs: SubscriberDTO) {
    return this.subscriberService.createSubs(subs);
  }
}
