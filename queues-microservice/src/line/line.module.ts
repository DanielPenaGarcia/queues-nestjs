import { Global, Module} from '@nestjs/common';
import { LineGateway } from './line.gateway';

@Global()
@Module({
    providers: [LineGateway],
})
export class LineModule{
}
