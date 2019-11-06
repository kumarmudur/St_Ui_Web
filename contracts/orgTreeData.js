export const TreeView = {
    name: 'Paris Gallery',
    companyName: 'Paris Gallery',
    children: [
      {
        name: 'USA',
        country: 'USA',
        children: [
            {
              name: 'Alabama',
              state: 'Alabama',
              children: [
                {
                  name: 'Montgomery',
                  'city': 'Montgomery',
                  children: [
                    {
                      name: 'A2Z Pvt Ltd',
                      officeName: 'A2Z Pvt Ltd',
                      children: [
                        {
                          name: 'Sales',
                          department: 'Sales',
                          children: [
                            {
                              name: 'Inside sales',
                              subDepartment: 'Inside sales'
                            }, {
                              name: 'Field Sales',
                              subDepartment: 'Field Sales'
                            }
                          ]
                        }
                      ]
                    }, {
                      name: 'ABC Pvt Ltd',
                      officeName: 'ABC Pvt Ltd',
                      children: [
                        {
                          name: 'Slaes', 
                          department: 'Slaes',
                          children: [
                            {
                              name: 'Inside sales',
                              subDepartment: 'Inside sales'
                            }, {
                              name: 'Field Sales',
                              subDepartment: 'Field Sales'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
        ]
      },
    ]
  };