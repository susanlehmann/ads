import { CalendarModule } from './calendar.module';

describe('ChartsModule', () => {
    let chartsModule: CalendarModule;

    beforeEach(() => {
        chartsModule = new CalendarModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
