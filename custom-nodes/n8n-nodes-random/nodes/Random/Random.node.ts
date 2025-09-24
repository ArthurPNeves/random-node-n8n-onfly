import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Generate true random numbers using Random.org API',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'trueRandomNumber',
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trueRandomNumber',
						description: 'Generate a true random number using Random.org API',
						action: 'Generate a true random number',
					},
				],
			},
			{
				displayName: 'Minimum Value',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				displayOptions: {
					show: {
						operation: ['trueRandomNumber'],
					},
				},
				description: 'The minimum value for the random number (inclusive)',
				typeOptions: {
					minValue: -1000000000,
					maxValue: 1000000000,
				},
			},
			{
				displayName: 'Maximum Value',
				name: 'max',
				type: 'number',
				default: 100,
				required: true,
				displayOptions: {
					show: {
						operation: ['trueRandomNumber'],
					},
				},
				description: 'The maximum value for the random number (inclusive)',
				typeOptions: {
					minValue: -1000000000,
					maxValue: 1000000000,
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			if (operation === 'trueRandomNumber') {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				// Validate input parameters
                if (min >= max) {
                    throw new NodeOperationError(this.getNode(), `Valor mínimo (${min}) 
                    não pode ser maior ou igual que valor máximo (${max})`, { itemIndex: i });
                }

				try {
					// Chamada de api Random.org API
					const randomNumber = await Random.generateRandomNumber(min, max);
					
					const newItem: INodeExecutionData = {
						json: {
							randomNumber,
							min,
							max,
							source: 'random.org',
							timestamp: new Date().toISOString(),
						},
					};

					returnData.push(newItem);
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					throw new NodeOperationError(
						this.getNode(),
						`Failed to generate random number: ${errorMessage}`,
						{ itemIndex: i }
					);
				}
			}
		}

		return [returnData];
	}

	private static async generateRandomNumber(min: number, max: number): Promise<number> {
		const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
		
		try {
			const response = await fetch(url);
			
			if (!response.ok) {
				throw new Error(`Random.org API returned status ${response.status}: ${response.statusText}`);
			}

			const responseText = await response.text();
			const randomNumber = parseInt(responseText.trim(), 10);

			if (isNaN(randomNumber)) {
				throw new Error(`Invalid response from Random.org API: ${responseText}`);
			}

			return randomNumber;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Random.org API error: ${error.message}`);
			}
			throw new Error('Unknown error occurred while calling Random.org API');
		}
	}
}