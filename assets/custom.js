document.addEventListener("DOMContentLoaded", function() {
    // home page logo section scroll js
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            // add data-animated="true" to every `.scroller` on the page
            scroller.setAttribute("data-animated", true);

            // Make an array from the elements within `.scroller-inner`
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    // Home page product tab Section
    const tabs = document.querySelector(".wrapper");
    const tabButton = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".content");
    if (tabs) {
        tabs.onclick = (e) => {
            const id = e.target.dataset.id;
            if (id) {
                tabButton.forEach((btn) => {
                    btn.classList.remove("active");
                });
                e.target.classList.add("active");

                contents.forEach((content) => {
                    content.classList.remove("active");
                });
                const element = document.getElementById(id);
                element.classList.add("active");
            }
        };
    }

    // Bottom popup close
    document
        .querySelector(".video_popup_close")
        .addEventListener("click", function() {
            this.closest(".video_popup").style.display = "none";
        });

    // Bundle Qty Plus Minus
    var QtyInput = (function() {
        var qtyInputs = document.querySelectorAll(".qty-input");

        if (!qtyInputs.length) {
            return;
        }

        qtyInputs.forEach(function(qtyInput) {
            var inputs = qtyInput.querySelector(".product-qty");
            var countBtns = qtyInput.querySelectorAll(".qty-count");
            var qtyMin = parseInt(inputs.getAttribute("min"));
            var qtyMax = parseInt(inputs.getAttribute("max"));

            inputs.addEventListener("change", function() {
                var minusBtn = qtyInput.querySelector(".qty-count--minus");
                var addBtn = qtyInput.querySelector(".qty-count--add");
                var qty = parseInt(inputs.value);

                if (isNaN(qty) || qty <= qtyMin) {
                    inputs.value = qtyMin;
                    minusBtn.setAttribute("disabled", true);
                } else {
                    minusBtn.removeAttribute("disabled");

                    if (qty >= qtyMax) {
                        inputs.value = qtyMax;
                        addBtn.setAttribute("disabled", true);
                    } else {
                        inputs.value = qty;
                        addBtn.removeAttribute("disabled");
                    }
                }
            });

            countBtns.forEach(function(countBtn) {
                countBtn.addEventListener("click", function() {
                    var operator = countBtn.dataset.action;
                    var input = qtyInput.querySelector(".product-qty");
                    var qty = parseInt(input.value);

                    if (operator == "add") {
                        qty += 1;
                        if (qty >= qtyMin + 1) {
                            qtyInput
                                .querySelector(".qty-count--minus")
                                .removeAttribute("disabled");
                        }

                        if (qty >= qtyMax) {
                            countBtn.setAttribute("disabled", true);
                        }

                    } else {
                        qty = qty <= qtyMin ? qtyMin : qty - 1;

                        if (qty == qtyMin) {
                            countBtn.setAttribute("disabled", true);
                        }

                        if (qty < qtyMax) {
                            qtyInput
                                .querySelector(".qty-count--add")
                                .removeAttribute("disabled");
                        }
                    }

                    var ProId = this.closest(".product-item").getAttribute("id");
                    var AddedItem = document.querySelectorAll(".product_add_item_main .product_add_item");
                    var total = 0;
                    AddedItem.forEach(function(item) {
                        const ID = item.dataset.id;
                        if (ProId == ID) {
                            item.querySelector(".p-info .bundle_qty_value").innerHTML = qty;
                        }


                        const QtyValue = parseInt(item.querySelector(".p-info .bundle_qty_value").innerHTML);
                        const priceValue = parseFloat(item.dataset.price);
                        var totalPrice = QtyValue * priceValue;
                        item.setAttribute('data-total', totalPrice);
                        var Datatotal = parseFloat(item.dataset.total);
                        total += Datatotal;

                    });
                    total = total.toFixed(2);
                    let fivePercent = (total * 0.05).toFixed(2);
                    let fivePercent_value = (total - fivePercent).toFixed(2);
                    document.querySelector(".bundle-bottom-content .product_bundle_price").innerHTML = '$' + total;
                    document.querySelector(".bundle-bottom-content .discount_bundle_price").innerHTML = '$' + fivePercent_value;
                    input.value = qty;
                });
            });
        });
    })();

    // Add Bundle Btn
    var addBtn = document.querySelectorAll(".product-data .product-item");
    addBtn.forEach(function(Btn) {
        Btn.querySelector(".add_btn").addEventListener("click", function() {
            this.style.display = 'none';
            this.closest(".prduct-btns").querySelector('.qty_box').style.display = 'block';


            this.closest(".product-item").classList.add("active");
            const Id = this.closest(".product-item").getAttribute("id");
            const VarId = this.closest(".product-item").getAttribute("variant-id");
            const Imgsrc = Btn.querySelector(".product-images").dataset.src;
            const title = Btn.querySelector(".product-info .p_title").dataset.title;
            const price = Btn.querySelector(".product-info .p_price").dataset.money;
            const withoutcurr = Btn.querySelector(".product-info .p_price").dataset.curr;

            var mainItem = this.closest('.bundle-configurator-content').querySelector(".product_add_item_main");
            var data = '<div class="product_add_item" data-id="' + Id + '"  data-var="' + VarId + '"  data-price="' + withoutcurr + '" data-total="' + withoutcurr + '">' +
                '<div class="p-img">' +
                '<img src="' + Imgsrc + '" alt=' + title + '>' +
                '</div>' +
                '<div class="p-info">' +
                '<h4>' + title + '</h4>' +
                '<p>' + price + '</p>' +
                '<p><span class="bundle__qty"> Quantity: <span class="bundle_qty_value"> 1</span></p>' +
                '</div>' +
                '<div class="remove-item">' +
                '<span><svg width="24" height="24" viewBox="0 0 256 256"><path d="M164.24 100.24 136.48 128l27.76 27.76a6 6 0 1 1-8.48 8.48L128 136.48l-27.76 27.76a6 6 0 0 1-8.48-8.48L119.52 128l-27.76-27.76a6 6 0 0 1 8.48-8.48L128 119.52l27.76-27.76a6 6 0 0 1 8.48 8.48ZM230 128A102 102 0 1 1 128 26a102.12 102.12 0 0 1 102 102Zm-12 0a90 90 0 1 0-90 90 90.1 90.1 0 0 0 90-90Z"></path></svg></span>' +
                '</div>';

            mainItem.insertAdjacentHTML('beforeend', data);
               this.closest(".bundle-configurator-section").querySelector(".step_btn .btn-next").removeAttribute("disabled");

            var AddedItem_check = document.querySelectorAll(".product_add_item_main .product_add_item");
            var item_length = AddedItem_check.length;
            var check_step = document.querySelector('.step__4');
            if (item_length > 3 &&  check_step.classList.contains('step__active')) {
                document.querySelector(".bundle_add_content .main_add_to_cart_btn .bundle__add").removeAttribute("disabled");
            }

            // Remove btn click 
            var AddedItem = document.querySelectorAll(".product_add_item_main .product_add_item");
            var total = 0;
            AddedItem.forEach(function(item) {
                item.querySelector(".remove-item span svg").addEventListener("click", function() {
                    const ID = this.closest('.product_add_item').dataset.id;
                    document.getElementById(ID).classList.remove('active');
                    document.getElementById(ID).querySelector(".add_btn").style.display = 'block';
                    document.getElementById(ID).querySelector('.qty_box').style.display = 'none';
                    this.closest('.product_add_item').remove();


                    var AddedItem_check = document.querySelectorAll(".product_add_item_main .product_add_item");
                    var total = 0;

                    for (var i = 0; i < AddedItem_check.length; i++) {
                        var Datatotal = parseFloat(AddedItem_check[i].dataset.total);
                        total += Datatotal;
                    }

                    total = total.toFixed(2);
                    let fivePercent = (total * 0.05).toFixed(2);
                    let fivePercent_value = (total - fivePercent).toFixed(2);
                    document.querySelector(".bundle-bottom-content .product_bundle_price").innerHTML = '$' + total;
                    document.querySelector(".bundle-bottom-content .discount_bundle_price").innerHTML = '$' + fivePercent_value;

                    var item_length = AddedItem.length
                    if (item_length == 0) {
                        document.querySelector(".bundle-bottom-content .product_bundle_price").innerHTML = '$00.00';
                        document.querySelector(".bundle-bottom-content .discount_bundle_price").innerHTML = '$00.00';
                    }
                });

                var Datatotal = parseFloat(item.dataset.total);
                total += Datatotal;
            });

            total = total.toFixed(2);
            let fivePercent = (total * 0.05).toFixed(2);
            let fivePercent_value = (total - fivePercent).toFixed(2);
            document.querySelector(".bundle-bottom-content .product_bundle_price").innerHTML = '$' + total;
            document.querySelector(".bundle-bottom-content .discount_bundle_price").innerHTML = '$' + fivePercent_value;
        });
    });


    // next step btn
    document.querySelector('.step_btn .btn-next').addEventListener("click", function() {
      
           this.closest(".bundle-configurator-section").querySelector(".step_btn .btn-prev").removeAttribute("disabled");

        var step_grid_top = document.querySelectorAll(".step-data");
        var step_next_top = document.querySelector(".step-data.step__active");
        var step_grid_bottom = document.querySelectorAll(".step-contents");
        var step_next_bottom = document.querySelector(".step-contents.active_step");
        step_grid_top.forEach(function(stepTop) {

        var stepTop_last = document.querySelector('.step-data:last-child');
        
        if (stepTop_last && stepTop_last.classList.contains('step__active')) {
        return;
        }


          

            if (stepTop.classList.contains('step-data') && stepTop.classList.contains('step__active')) {
                stepTop.classList.remove('step__active');
                var nextStep = step_next_top.nextElementSibling;
                if (nextStep) {
                    nextStep.classList.add('step__active');
                  nextStep.classList.add('step__used');
                }
            }
        });
        step_grid_bottom.forEach(function(step) {
          
var stepbottom_last = document.querySelector('.step-contents:last-child');
        
        if (stepbottom_last && stepbottom_last.classList.contains('active_step')) {
        return;
        }

        
          
            if (step.classList.contains('step-contents') && step.classList.contains('active_step')) {
                step.classList.remove('active_step');
                var nextStep = step_next_bottom.nextElementSibling;
                if (nextStep) {
                    nextStep.classList.add('active_step');
                  nextStep.classList.add('step__used_bottom');
                }
            }
        });
      
    });

    // prev step btn
    document.querySelector('.step_btn .btn-prev').addEventListener("click", function() {
        var step_grid_top = document.querySelectorAll(".step-data");
        var step_prev_top = document.querySelector(".step-data.step__active");
        var step_grid_bottom = document.querySelectorAll(".step-contents");
        var step_prev_bottom = document.querySelector(".step-contents.active_step");

        step_grid_top.forEach(function(stepTop) {
            if (stepTop.classList.contains('step__1') && stepTop.classList.contains('step__active')) {
                return;
            }
            if (stepTop.classList.contains('step-data') && stepTop.classList.contains('step__active')) {
                stepTop.classList.remove('step__active');
                var prevStep = step_prev_top.previousElementSibling;
                if (prevStep) {
                    prevStep.classList.add('step__active');
                }
            }
        });

        step_grid_bottom.forEach(function(step_bottom) {
            if (step_bottom.classList.contains('steps_1') && step_bottom.classList.contains('active_step')) {
                return;
            }

            if (step_bottom.classList.contains('step-contents') && step_bottom.classList.contains('active_step')) {
                step_bottom.classList.remove('active_step');
                var prevStep = step_prev_bottom.previousElementSibling;
                if (prevStep) {
                    prevStep.classList.add('active_step');
                }
            }
        });
    });


  // Add to cart Button
    document.querySelector(".main_add_to_cart_btn .button").addEventListener("click", function() {
      
    var active_product_check = document.querySelectorAll('.bundle-configurator-content .step__used');
    var active_product_bottom = document.querySelectorAll('.sticky-grid .step__used_bottom');

    // document.querySelector('.step__active').classList.add('active_extra');

    var check_l = active_product_check.length;
    var check_enable_ = 0;
    active_product_check.forEach(function (active_class,index) {
        var active_class_elements = active_class.querySelectorAll(".step__used .active");
        var active_class_length = active_class_elements.length;

      var index = index + 1;
        if (active_class_length == 0) {
                check_enable_ += 1; 
                active_class.classList.add('step__active');
                var get_number = active_class.dataset.value;
                active_product_bottom.forEach(function (bottom_val) {
                    var check_number = bottom_val.dataset.number;
                    if (check_number == get_number) {
                        bottom_val.classList.add('active_step');
                    } else {
                        bottom_val.classList.remove('active_step');
                    }
                });
          }  
        // else if (active_class_length == 1){
        //   if (index != check_l) {
        //                   active_class.classList.remove('step__active');
        //     }
        // }
        else {
            // console.log(index);
            // console.log(check_l);
            
             active_class.classList.remove('step__active');
          }
      
     });

      // document.querySelector('.active_extra').classList.add('step__active');
    
      if (check_enable_ == 1) {
          return false;
      }

    
      document.querySelector("#overlay").style.display = 'block';
        Shopify.queue = [];
        this.closest(".bundle-configurator-content .bundle_add_main").querySelectorAll('.product_add_item_main .product_add_item').forEach(function(element) {
            var thisQty = element.querySelector(".p-info .bundle_qty_value").innerHTML;
            var xVarID = element.getAttribute('data-var');

             // alert(thisQty);
            Shopify.queue.push({
                variantId: xVarID,
                variantqty: thisQty
            });
        });
        console.log(Shopify.queue);
        
        if (Shopify.queue.length !== 0) {

            Shopify.moveAlong = function() {
                if (Shopify.queue.length) {
                    var request = Shopify.queue.shift();
                    var varid = request.variantId;
                    var varqty = request.variantqty;

                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', '/cart/add.js', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            Shopify.moveAlong();
                        }
                    };

                    xhr.send('id=' + encodeURIComponent(varid) + '&quantity=' + encodeURIComponent(varqty));
                } else {
                   window.location.href = '/cart';
                    // document.querySelector("#overlay").style.display = 'none';
                }
            };

            Shopify.moveAlong();
        } else {

        }
    });


  // reset bundle click
  document.querySelector(".bundle_reset").addEventListener('click',function() {
    location.reload();
  });

});