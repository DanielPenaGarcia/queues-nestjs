import { Test } from '@nestjs/testing';
import { ShowingsController } from './showings.controller';

describe('ShowingsController', () => {
    let showingsController: ShowingsController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [], // Add
            controllers: [], // Add
            providers: [],   // Add
        }).compile();

        showingsController = moduleRef.get<ShowingsController>(ShowingsController);
    });

    it('should be defined', () => {
        expect(showingsController).toBeDefined();
    });
});
