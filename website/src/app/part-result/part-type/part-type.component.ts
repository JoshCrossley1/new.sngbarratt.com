import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../classes/customer';

@Component({
  selector: 'part-type',
  templateUrl: './part-type.component.html',
  styleUrls: ['./part-type.component.css']
})
export class PartTypeComponent implements OnInit {

    codeSuffix: any;
    @Input() productCode: string;
    translation: any;
    context: any;
    @Input() display: string;
    template: string;

    custValues: any;

    constructor(private customerClass: Customer) {

        this.customerClass.get()
            .subscribe(cust => {
                this.custValues = cust;
                this.custValues['languageId'] = 1;
            })

    }

    ngOnInit() {
        
        switch (this.codeSuffix) {
            case '*':
                this.translation = [
                    {
                        title: 'Aftermarket Reproduction',
                        description: 'High quality aftermarket/reproduction alternative.'
                    },
                    {
                        title: 'Reproduction',
                        description: 'Solution alternative et reproduction de haute qualité.'
                    },
                    {
                        title: 'Aftermarket-Identteil',
                        description: 'Alternatives Aftermarket-/Identteil hoher Qualität.'
                    },
                    {
                        title: 'Aftermarket onderdelen',
                        description: 'Hoge kwaliteit aftermarket alternatief.'
                    },
                    {
                        title: 'Aftermarket Reproduction',
                        description: 'High quality aftermarket/reproduction alternative.'
                    }
                ]
                break;

            case '#':
                this.translation = [
                    {
                        title: 'OE (Original Equipment)',
                        description: 'Original Equipment Manufacturer, part as supplied to Jaguar.'
                    },
                    {
                        title: 'OE (Pièce d\'origine)',
                        description: 'Fabriquant d\'origine, sous traitant d\'origine.'
                    },
                    {
                        title: 'OE (Originalausrüstung)',
                        description: 'Originalausrüster, Teil wie an Jaguar geliefert.'
                    },
                    {
                        title: 'OE ( originele onderdelen )',
                        description: 'Originele Jaguar toeleverancier'
                    },
                    {
                        title: 'OE (Original Equipment)',
                        description: 'Original Equipment Manufacturer, part as supplied to Jaguar.'
                    }
                ]
                break;

            case 'U':
                this.translation = [
                    {
                        title: 'Uprated',
                        description: 'An uprated alternative to the original part.'
                    },
                    {
                        title: 'Revalorisé',
                        description: 'Une meilleure option que la pièce détachée originale.'
                    },
                    {
                        title: 'Verbessert',
                        description: 'Eine verbesserte Alternative zum Originalteil.'
                    },
                    {
                        title: 'Opgewaardeerd',
                        description: 'Original Equipment Manufacturer, part as supplied to Jaguar.'
                    },
                    {
                        title: 'Uprated',
                        description: 'Een opgewaardeerd alternatief voor het oorspronkelijke onderdeel.'
                    }
                ]
                break;

            default: 
                //if part type is in a comparison context
                if (this.context == 'comparison') {
                    this.translation = [
                        {
                            title: 'alternative'
                        },
                        {
                            title: 'alternative'
                        },
                        {
                            title: 'alternative'
                        },
                        {
                            title: 'alternatief'
                        },
                        {
                            title: 'alternative'
                        }
                    ]
                    //if description = 'A alternative part with a alternative description.';
                } else {
                    this.translation = [
                        {
                            title: 'Standard'
                        },
                        {
                            title: 'Standard'
                        },
                        {
                            title: 'Standard'
                        },
                        {
                            title: 'Standaard'
                        },
                        {
                            title: 'Standard'
                        }
                    ]
                }
        }

        if (this.display = 'description') {
            this.template = this.translation[this.custValues.languageId - 1].description;
        } else {
            this.template = this.translation[this.custValues.languageId - 1].title;
        }
  }

}
