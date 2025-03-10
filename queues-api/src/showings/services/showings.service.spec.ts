import { Test } from '@nestjs/testing';
import { ShowingsService } from './showings.service';

describe('ShowingsService', () => {
    let showingsService: ShowingsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [],   // Add
        }).compile();

        showingsService = moduleRef.get<ShowingsService>(ShowingsService);
    });

    it('should be defined', () => {
        expect(showingsService).toBeDefined();
    });
});
