import { Component } from "@angular/core";

@Component({
  selector: "app-about",
  template: `
    <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
      <h2
        class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
      >
        Our Team
      </h2>

      <div
        class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6"
      >
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We are using Angular for frontend development, integrating it with
            the backend components developed using Node.js, Express, and
            MongoDB.
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-3">
          <div
            *ngFor="let memeber of teamers"
            class="text-center text-gray-500 dark:text-gray-400"
          >
            <img
              class="mx-auto mb-4 w-36 h-36 rounded-full"
              [src]="memeber.image"
              alt="Bonnie Avatar"
            />
            <h3
              class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ memeber.name }}
            </h3>
            <p>{{ memeber.id }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AboutComponent {
  teamers = [
    {
      name: "Xianhong Cai",
      id: "615218",
      image:
        "https://media.istockphoto.com/id/887835694/vector/woman-with-sunglasses-profile.jpg?s=612x612&w=0&k=20&c=2Z5KPKdLZDuHxwJaRBeEaeGWeXzb_LBLU5BHHAjSEdU=",
    },
    {
      name: "Qijun Zheng",
      id: "615876",
      image:
        "https://media.istockphoto.com/id/896455842/vector/young-man-with-elegant-clothes-and-sunglasses.jpg?s=612x612&w=0&k=20&c=6PhcweNIJYPZvXQpIL6Vq5JIBGRIILnicZbpj1FJwa4=",
    },
    {
      name: "Wenhong Huang",
      id: "616003",
      image:
        "https://media.istockphoto.com/id/896455842/vector/young-man-with-elegant-clothes-and-sunglasses.jpg?s=612x612&w=0&k=20&c=6PhcweNIJYPZvXQpIL6Vq5JIBGRIILnicZbpj1FJwa4=",
    },
  ];
}
