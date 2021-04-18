import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { ProductService } from '../../../_service/admin/product.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  main_image: any;
  live_main_image_url: any;
  uploaded_main_image: any;
  details_image:any;
  live_details_image_url:any
  uploaded_details_image:any;
  id: number
  data: any;
  product_images:any[]=[];
  live_product_images:any[]=[];
  images:any[];
  imagePath=GlobalVariable.IMAGE_PATH;
  constructor(public _productService: ProductService, public fb: FormBuilder, private _gs: GlobalService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: [''],
      description: [''],
      details_image: [''],
      ingrediants: [''],
      main_image: [''],
      offer_price: [''],
      price: ['', Validators.required],
      product_name: ['', Validators.required],
      quantity: ['', Validators.required],
      regular_price: [''],
      short_description: ['', Validators.required],
      subscriber_price: ['']
    })
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    if (this.id) {
      this.getEditData();
    }
  }


  main_imageUpload(event: any) {
    let reader = new FileReader();
    this.main_image = event.target.files[0];
    this.createForm.patchValue({
      main_image:this.main_image
    })
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.live_main_image_url = reader.result;
      };
    }
  }
  cancelmain_image() {
    this.live_main_image_url = ''
  }
  details_imageUpload(event: any) {
    let reader = new FileReader();
    this.details_image = event.target.files[0];
    this.createForm.patchValue({
      details_image: this.details_image
    })
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.live_details_image_url = reader.result;
      };
    }
  }
  canceldetails_image() {
    this.live_details_image_url = ''
  }

  mutipleImage(event:any){
    var imageLength = event.target.files.length
    for (let i = 0; i < imageLength;i++){
      this.product_images.push(
        event.target.files[i]
      )
      var live_image_url:any;
      if (event.target.files && event.target.files.length > 0) {
        let reader = new FileReader();
        let file = event.target.files[i];
        reader.readAsDataURL(file);
        reader.onload = () => {
          live_image_url = reader.result;
        };
        this.live_product_images.push(
          live_image_url
        )
        console.log(this.live_product_images);
      }
    }
  }

  cancelImage(){

  }

  getEditData() {
    this._productService.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.images = res.images;
      console.log(this.data);
      this.edit();
    })
  }
  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value;
      const fd = new FormData();
      if(this.id){
        fd.append('id', value.id);
      }
      console.log(value);
      fd.append('description', value.description);
      fd.append('details_image', value.details_image);
      fd.append('ingrediants', value.ingrediants);
      fd.append('main_image', this.main_image);
      for(let i=0;i<this.product_images.length;i++){
        fd.append('product_image'+i, this.product_images[i]);
      }
      fd.append('length', this.product_images.length.toString());
      fd.append('details_image', this.details_image);
      fd.append('offer_price', value.offer_price);
      fd.append('price', value.price);
      fd.append('product_name', value.product_name);
      fd.append('quantity', value.quantity);
      fd.append('regular_price', value.regular_price);
      fd.append('short_description', value.short_description);
      fd.append('subscriber_price', value.subscriber_price);
      this._productService.create(fd).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.createForm.reset();//reset for
          if (this.id) {
            this.router.navigate(['/admin/product/list']);
          }
        }, (error: any) => {
          this._gs.message('bottom-right', 'danger', error.message);
          this.create_on_process = false;
          //process done
        }
      )
    } else {
      this._gs.message('bottom-right', 'danger', 'Please fill all fields properly');
    }
  }
  edit() {
    const data = this.data;
    this.uploaded_main_image = data.main_image;
    this.uploaded_details_image = data.details_image;
    this.createForm.patchValue({
      id: data.id,
      description: data.description,
      details_image: this.details_image,
      ingrediants: data.ingrediants,
      main_image: this.main_image,
      offer_price: data.offer_price,
      price: data.price,
      product_name: data.product_name,
      quantity: data.quantity,
      regular_price: data.regular_price,
      short_description: data.short_description,
      subscriber_price: data.subscriber_price
    })
  }


  deleteImage(id:any){
    this._productService.deleteImage(id).subscribe(
      (res:any)=>{
        this._gs.message('bottom-right', 'success', res.message);
        this.getEditData();
      },
      (error:any)=>{
        this._gs.message('bottom-right', 'danger', error.message);
      },
    )
  }

}
