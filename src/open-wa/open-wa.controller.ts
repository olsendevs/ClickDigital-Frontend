// qr-code.controller.ts

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { OpenWAService } from './open-wa.service';
import { Response } from 'express';
import { ev } from '@open-wa/wa-automate';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('qr-code')
export class OpenWAController {
  constructor(private readonly openWASession: OpenWAService) {}
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  async getQRCode(@Res() res: Response, @Req() req) {
    try {
      await res.setHeader('Content-Type', 'image/png');
      ev.on('qr.**', async (image) => {
        try {
          setTimeout(async () => {
            await this.openWASession.closeSession();
          }, 10000);

          return await res.send(image);
        } catch (e) {}
      });

      ev.onAny(async (data, namespace) => {
        if (namespace == 'SUCCESS')
          try {
            await res.setHeader('Content-Type', 'text/json');
            return await res.send('Already conected.');
          } catch (e) {}
      });

      this.openWASession.startSession(req.user.id);
    } catch (error) {
      res.status(500).send('Erro ao obter o código QR.');
    }
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get('check')
  async getSeasson(@Res() res: Response, @Req() req) {
    try {
      const result = await this.openWASession.checkSession();
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send('Erro ao obter o  sessão do usuário.');
    }
  }
}
