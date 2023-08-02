import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(RolesGuard)
  @Roles('default')
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() request) {
    const userId = request.user.id;
    return this.customerService.create(createCustomerDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  findAll(@Req() request) {
    const userId = request.user.id;
    return this.customerService.findAll(userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.customerService.findOne(id, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.customerService.update(id, updateCustomerDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
