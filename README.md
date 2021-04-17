# Use AWS S3 bucket as a static website hosting
  
Youtube tutorial: [How to serve a static website hosted on AWS S3 bucket and AWS CloudFront with custom domain name](https://www.youtube.com/channel/UCd2btbWoByFedOolTMsRSCA)  
  
## Configure S3 bucket  
1. make sure the `Block Public Access settings for this account` in AWS has all the checkboxes cleared/deselected 
2. create a new `S3` bucket 
3. once you are within your bucket -> `Permissions` -> `Block public access (bucket settings)` clear all checkboxes 
4. upload your files in the bucket (no nested folders should be created) 
5. once you are within your bucket -> `Properties` -> `Static website hosting` -> `Edit` -> enable `Static website hosting` 
6. for `Index document` specify `index.html` 
7. for `Redirection rules` add the following rules:
```json
[
    {
        "Condition": {
            "HttpErrorCodeReturnedEquals": "403"
        },
        "Redirect": {
            "HostName": "aws.md.md",
            "Protocol": "https",
            "ReplaceKeyPrefixWith": "#!/"
        }
    },
    {
        "Condition": {
            "HttpErrorCodeReturnedEquals": "404"
        },
        "Redirect": {
            "HostName": "aws.md.md",
            "Protocol": "https",
            "ReplaceKeyPrefixWith": "#!/"
        }
    }
]
```
instead of `aws.md.md` use your domain name  
8. save changes  
9. once you are within your bucket -> `Properties` -> `Static website hosting` -> copy the `Bucket website endpoint` without protocol (NO `http://` !!!) 
 
## Configure CloudFront
10. go to `CloudFront` -> `Create Distribution` 
11. use these properties:  
  `Origin Domain Name` : S3 bucket URL endpoint you've copied at point 9 (without protocol `http://`)   
  `Viewer Protocol Policy` : `Redirect HTTP to HTTPS`  
  `Alternate Domain Names (CNAMEs)`: specify your custom domain name(s) (e.g: `aws.md.md`)  
  tick `Custom SSL Certificate (example.com)` and select from the autocomplete input box the certificate you've created in `Certificate Manager`  
  click `Create Distribution` distribution button  
12. Wait until your distribution has the `Status`: `Deployed` 
  
## Configure Route 53 hosted zone
13. go to `Route 53`  
14. select your hosted zone  
15. click on `Create new record`  
16. `Record type`: `A - ...`
17. toggle the `Alias` radio button, and specify `Route traffic to`: domain name of your `CloudFront` distribution  
18. click `Create records`  
19. wait until your zone is properly updated
20. Open your domain -> you should see your website served from `S3` bucket through `CloudFront` distribution


## Links
[Hosting a static website using Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
