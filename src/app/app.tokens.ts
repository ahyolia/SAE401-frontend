import { InjectionToken } from '@angular/core';
import { ApiConfig } from './interfaces/config.interface';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');