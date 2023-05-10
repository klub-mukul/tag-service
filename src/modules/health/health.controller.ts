'use strict';

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { HealthCheckResult } from '@nestjs/terminus';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

/**
 * HealthController
 * @export
 * @class HealthController
 */
@Controller('health')
@ApiTags('Health')
export class HealthController {
  /**
   * constructor
   * Creates an instance of HealthController.
   * @param {HealthCheckService} healthCheck
   * @param {TypeOrmHealthIndicator} typeOrmHealthIndicator
   * @memberof HealthController
   */
  constructor(
    private readonly healthCheck: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  /**
   * health
   * @return {Promise<HealthCheckResult>}
   * @memberof HealthController
   */
  @Get()
  @HealthCheck()
  public async health(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () => this.typeOrmHealthIndicator.pingCheck('postgres'),
    ]);
  } // End of health
} // End of HealthController
