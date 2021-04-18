import { Component, OnInit, NgModule, AfterViewInit} from '@angular/core';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { CartService } from '../../_service/cart.service';
import { environment } from '../../../environments/environment';
import { FrontendService } from '../../_service/frontend.service';
import { loadTranslations } from '@angular/localize';
declare var SqPaymentForm: any; //magic to allow us to access the SquarePaymentForm lib
@Component({
  selector: 'ngx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  deliveryDetailsForm: FormGroup;
  personalDetails: FormGroup;
  success:boolean;
  cash_on_delivery:boolean=true;
  cartItems:any[];
  totalQuantity:number = 0;
  subtotal:number=0;
  isDeliverySubmited:boolean=false;
  isPersonalDetailsSubmitted:boolean=false;
  isNonceGenarated = false;
  error_message:any[]=[];
  final_error_message:string;
  nonce:any;
  selectedActivityIndex:number=1


  constructor(private fb: FormBuilder,private _cartservice:CartService,private frontendService:FrontendService) {
  }
  paymentForm;
  ngOnInit(): void {
    this.deliveryDetailsForm = this.fb.group({
      city:['w',Validators.required],
      state:['w',Validators.required],
      street:['w',Validators.required],
      house:['w', Validators.required],
      floor:['w'],
      delivery_instruction:['']
    });

    this.personalDetails = this.fb.group({
      first_name:['w',Validators.required],
      last_name:['w',Validators.required],
      email:['19moynul@gmail.com',[Validators.required,Validators.email]],
      phone:['23232',Validators.required],
      additional_phone:[''],
    });
    this.getCartItems();
  }
  requestCardNonce(event) {

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
  }
  ngAfterViewInit() { }

  getCartItems(){
    this.totalQuantity = 0;
    this.subtotal = 0;
    this.cartItems = JSON.parse(localStorage.getItem('items'));
    for(let i in this.cartItems){
      this.totalQuantity = (+this.totalQuantity)+(+this.cartItems[i].quantity);
      var price = this.cartItems[i].price * this.cartItems[i].quantity
      this.subtotal = (+this.subtotal)+(+price);
    }
  }

  onFirstSubmit() {
    this.isDeliverySubmited=true;
    if(!this.deliveryDetailsForm.invalid){
      this.isDeliverySubmited = false;
    }
    this.deliveryDetailsForm.markAsDirty();
  }

  onSecondSubmit() {
    this.isPersonalDetailsSubmitted = true;
    if (!this.personalDetails.invalid) {
      this.isPersonalDetailsSubmitted = false;
    }
    this.personalDetails.markAsDirty();
  }

  changePaymentMethod(value:any){
    this.cash_on_delivery = value;
    if(!this.cash_on_delivery){
      this.createPaymentForm();
      this.isNonceGenarated = false;
    }
  }

  removeQty(item:any){
    this._cartservice.removeQty(item);
    this.getCartItems();
  }

  changeSelectedIndex(value){
    this.selectedActivityIndex=value;
  }

  createPaymentForm(){
    var th = this;
    const paymentForm = new SqPaymentForm({
      // Initialize the payment form elements

      //TODO: Replace with your sandbox application ID
      applicationId: "sandbox-sq0idb-ZKgXiRMonG6i-FTxUwY7dg",
      inputClass: 'sq-input',
      autoBuild: false,
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
      }],
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach(function (error) {
              // this.error_message.push(error.message);
            });
            return;
          }
          th.nonce=nonce;
          // alert(nonce);
        }
      }
    });
    paymentForm.build();
    this.paymentForm = paymentForm
  }


  proessOrder(){
    var deliverydata = this.deliveryDetailsForm.value;
    var personaldata = this.personalDetails.value;
    if(!this.cash_on_delivery){
      this.onGetCardNonce;
    }
    const data = {
      city:deliverydata.city,
      state:deliverydata.state,
      street:deliverydata.street,
      house:deliverydata.house,
      floor:deliverydata.floor,
      delivery_instruction:deliverydata.delivery_instruction,
      first_name:personaldata.first_name,
      last_name:personaldata.last_name,
      email:personaldata.email,
      phone:personaldata.phone,
      additional_phone:personaldata.additional_phone,
      payment_type:this.cash_on_delivery?'1':'2',
      subtotal:this.subtotal,
      nonce:!this.cash_on_delivery?this.nonce:'',
      location_id: environment.SQUARE_LOCATION_ID,
      idempotency_key:this.uuidv4(),
      items:localStorage.getItem('items')
    }

    console.log(data);

    if (!this.deliveryDetailsForm.invalid && !this.personalDetails.invalid){
      this.frontendService.processOrder(data).subscribe(
        (res:any)=>{
          console.log(res);
          this.success=true;
          localStorage.removeItem('items');
          this.deliveryDetailsForm.reset();
          this.personalDetails.reset();
          this.nonce='';
          this.cash_on_delivery=true;
        },
        (error:any)=>{
          console.log(error);
          this.success=false;
          this.final_error_message = error.message
        }
      );
    }
  }

  onGetCardNonce(event) {

    this.nonce = '';
    this.error_message.length = 0;
    console.log(event);
    this.isNonceGenarated = false;
    if(!this.cash_on_delivery){
      // Request a nonce from the SqPaymentForm object
      console.log(this.paymentForm.requestCardNonce());
      setTimeout(()=>{
        if(this.nonce){
          this.isNonceGenarated = true;
        }
      },100);
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



  addQty(item:any){
    this._cartservice.addQty(item);
    this.getCartItems();
  }

}
